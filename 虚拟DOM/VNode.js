class VNode {
  constructor(tag, children, text) {
    this.tag = tag
    this.text = text
    this.children = children
  }

  render() {
    if(this.tag === '#text') {
      return document.createTextNode(this.text)
    }
    let el = document.createElement(this.tag)
    this.children.forEach(vChild => {
      el.appendChild(vChild.render())
    })
    return el
  }
}


function v(tag, children, text) {
  if(typeof children === 'string') {
    text = children
    children = []
  }
  return new VNode(tag, children, text)
}

function patchElement(parent, newVNode, oldVNode, index = 0) {
  if(!oldVNode) { // 老节点不存在 则新增节点
    parent.appendChild(newVNode.render())
  } else if(!newVNode) { // 新节点不存在 则删除老节点
    parent.removeChild(parent.childNodes[index])
  } else if(newVNode.tag !== oldVNode.tag || newVNode.text !== oldVNode.text) { // 标签名或文本内容不一样，则替换
    parent.replaceChild(newVNode.render(), parent.childNodes[index])
  }  else {  // 否则递归遍历下一层
    for(let i = 0; i < newVNode.children.length || i < oldVNode.children.length; i++) {
      patchElement(parent.childNodes[index], newVNode.children[i], oldVNode.children[i], i)
    }
  }
}


// 实例 : 这一步可以根据 dom 创建 html
let vNodes = v('div', [
      v('p', [
            v('span', [ v('#text', 'a.com') ] )
          ]
      ),
      v('span', [
        v('#text',  'a.com')
      ])
    ]
)
console.log(vNodes.render())



let vNodes1 = v('div', [
      v('p', [
            v('span', [ v('#text', 'y.com') ] )
          ]
      ),
      v('span', [
        v('#text',  'c.com')
      ])
    ]
)


let vNodes2 = v('div', [
      v('p', [
            v('span', [
              v('#text', 'c.com')
            ] )
          ]
      ),
      v('span', [
        v('#text',  'z.coms'),
        v('#text',  'z')
      ])
    ]
)

// 根据vNodes1第一次生成页面根节点
const root = document.querySelector('#root')

// 第二次修改获取vNode2，做对比
patchElement(root, vNodes2)
