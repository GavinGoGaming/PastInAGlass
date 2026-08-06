const defaults = {nonTextBehavior: 'remove'}

export default function blocksToText(blocks: any, opts: any = {}) {
  const options = Object.assign({}, defaults, opts)
  return blocks
    .map((block: any) => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove' ? '' : `[${block._type} block]`
      }

      return block.children.map((child: any) => child.text).join('')
    })
    .join('\n\n')
}