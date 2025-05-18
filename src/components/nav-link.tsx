import type { ComponentProps } from 'react'

interface NavLinkProps extends ComponentProps<'a'> {
  children: string
}

const NavLink = (props: NavLinkProps) => {
  return (
    <a
      {...props}
      className="font-medium text-sm text-zinc-300 outline-none
			after:content-[''] after:block after:w-0 after:h-[2px] after:bg-green-700
			focus:after:w-full hover:after:w-full
			after:transition-normal after:duration-200"
    >
      {props.children}
    </a>
  )
}

export default NavLink
