import type { ComponentProps } from "react";

interface TableRowProps extends ComponentProps<"tr"> {}

const TableRow = (props: TableRowProps) => {
	return (
		<tr className="border-b border-white/10 hover:bg-white/5" {...props} />
	);
};

export default TableRow;
