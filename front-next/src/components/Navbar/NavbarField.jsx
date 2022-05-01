import Link from "next/link"

const NavbarField = (props) => {
  const { ...otherProps } = props

  return (
    <Link {...otherProps}>
      <div
        {...otherProps}
        className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white
        font-bold items-center justify-center hover:bg-green-600
        hover:text-white "
      ></div>
    </Link>
  )
}
export default NavbarField
