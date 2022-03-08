import { enableChainAPI } from './type-assert'

enableChainAPI()

const oneElementArray = x => x.length === 1
const intString = 'string'.chainWith(x => !Number.isNaN(parseInt(x, 10)))
const floatString = 'string'.chainWith(x => !Number.isNaN(parseFloat(x)))

export default [
  {
    root: [
      {
        customPart: [
          {
            part: [],
            ':@': {
              id: intString
            }
          }
        ],
        ':@': {
          author: 'string',
          description: 'string',
          Parts: intString,
          SizeX: floatString,
          SizeY: floatString,
          SizeZ: floatString,
          CenterX: floatString,
          CenterY: floatString,
          CenterZ: floatString
        }
      }
    ].chainWith(oneElementArray)
  }
].chainWith(oneElementArray)
