// noinspection JSUnresolvedFunction

import { enableChainAPI } from './type-assert'

enableChainAPI()

const oneElementArray = x => x.length === 1
const intString = x => !Number.isNaN(parseInt(x, 10))

export default [
  {
    root: [
      {
        ship: [
          {
            part: ['object'],
            ':@': {
              id: 'string'.chainWith(intString),
              modname: 'string?'.sumWith('undefined')
            }
          }
        ],
        ':@': {
          author: 'string',
          description: 'string',
          hornType: 'string'.chainWith(intString),
          hornPitch: 'string'.chainWith(intString),
          tracerCol: 'string'
        }
      }
    ].chainWith(oneElementArray)
  }
].chainWith(oneElementArray)
