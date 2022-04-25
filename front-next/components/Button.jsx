import classNames from "classnames"

const className = "w-full bg-blue-600 hover:bg-gray-700 duration-300 text-white shadow p-2 rounded-r text-center"

const Button = (props) => {
  const { ...otherProps } = props

  return (
    <button
      {...otherProps}
      className={classNames(className)}
    />
  )
}

export default Button
