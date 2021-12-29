import atomOneDarkReasonable from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark";

export const grid = (x: number) => x * 8
export const style = {
  section: {
    title: {
      fontSize: grid(3),
      margin: {
        bottom: grid(1),
        top: grid(2)
      },
      padding: {
        vertical: 0,
        horizontal: 0
      }
    },
    padding: {
      mobile: {
        vertical: grid(2),
        horizontal: grid(1)
      },
      horizontal: grid(3),
      top: grid(2),
      bottom: grid(6)
    },
    maxWidth: grid(200),
    gap: grid(2)
  },
  typeTable: {
    th: {
      padding: {
        vertical: grid(1),
        horizontal: grid(2)
      }
    },
    td: {
      padding: {
        vertical: grid(1),
        horizontal: grid(2)
      },
      indent: grid(1)
    }
  },
  radius: 8,
  codeStyle: atomOneDarkReasonable
}
export const colors = {
  white: 'hsl(48, 60%, 95%)',
  veryVeryLightGrey: 'hsl(48, 10%, 97%)',
  veryLightGrey: 'hsl(48, 10%, 90%)',
  lightGrey: 'hsl(48, 10%, 80%)',
  grey: 'hsl(0, 0%, 67%)',
  darkGrey: 'hsl(48, 10%, 40%)',
  green: 'hsl(98, 70%, 36%)',
  red: 'hsl(0, 70%, 36%)',
  blue: 'hsl(213, 70%, 36%)',
  yellow: 'hsl(48, 80%, 45%)',
  codeHighlight: 'hsl(213, 45%, 12%)'
}
