import type { ComponentProps } from "react";

interface NavLinkProps extends ComponentProps<"a"> {
	children: string;
}

const NavLink = (props: NavLinkProps) => {
	return (
		<a {...props} className="font-medium text-sm text-zinc-300">
			{props.children}
		</a>
	);
};

export default NavLink;
