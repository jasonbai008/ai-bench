// 示例树形结构数据
const treeData = [
  {
    id: 1,
    name: '一级节点1',
    children: [
      {
        id: 11,
        name: '二级节点1-1',
        children: [
          {
            id: 111,
            name: '三级节点1-1-1',
            children: []
          },
          {
            id: 112,
            name: '三级节点1-1-2',
            children: []
          }
        ]
      },
      {
        id: 12,
        name: '二级节点1-2',
        children: []
      }
    ]
  },
  {
    id: 2,
    name: '一级节点2',
    children: [
      {
        id: 21,
        name: '二级节点2-1',
        children: [
          {
            id: 211,
            name: '三级节点2-1-1',
            children: [
              {
                id: 2111,
                name: '四级节点2-1-1-1',
                children: []
              }
            ]
          }
        ]
      }
    ]
  }
];

/**
 * 处理树形结构，去掉最后一级叶子节点，并移除倒数第二级的children字段
 * @param {Array} tree - 树形结构数据
 * @return {Array} - 处理后的树形结构
 */
function processTree(tree) {
  if (!Array.isArray(tree) || tree.length === 0) {
    return [];
  }

  // 深拷贝树形结构，避免修改原始数据
  const clonedTree = JSON.parse(JSON.stringify(tree));
  
  // 递归处理树形结构
  return processNodes(clonedTree);
}

/**
 * 递归处理节点
 * @param {Array} nodes - 节点数组
 * @return {Array} - 处理后的节点数组
 */
function processNodes(nodes) {
  if (!Array.isArray(nodes) || nodes.length === 0) {
    return [];
  }

  const result = [];

  for (const node of nodes) {
    // 检查当前节点是否有子节点
    if (Array.isArray(node.children) && node.children.length > 0) {
      // 检查子节点是否都是叶子节点（没有子节点或子节点为空数组）
      const allChildrenAreLeaves = node.children.every(
        child => !Array.isArray(child.children) || child.children.length === 0
      );

      if (allChildrenAreLeaves) {
        // 如果所有子节点都是叶子节点，则移除children字段
        const { children, ...nodeWithoutChildren } = node;
        result.push(nodeWithoutChildren);
      } else {
        // 否则递归处理子节点
        const processedChildren = processNodes(node.children);
        result.push({
          ...node,
          children: processedChildren
        });
      }
    } else {
      // 跳过叶子节点（不添加到结果中）
    }
  }

  return result;
}

// 测试函数
console.log('原始树形结构:');
console.log(JSON.stringify(treeData, null, 2));

const processedTree = processTree(treeData);
console.log('\n处理后的树形结构:');
console.log(JSON.stringify(processedTree, null, 2));
