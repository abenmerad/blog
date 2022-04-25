import classNames from "classnames"


const className = "bg-gray-200 shadow-inner rounded-l p-2 flex-1"
const Input = (props) => {
  const { className, ...otherProps } = props

  return (
      <input
        {...otherProps}
        className={classNames(
          "bg-gray-200 shadow-inner rounded-l p-2 flex-1",
          className
        )}
      />
  )
}
export default Input