import type { ComponentProps } from "react";

interface TableProps extends ComponentProps<"table"> {}

const Table = (props: TableProps) => {
	return (
		<div className="border border-white/10 rounded-lg">
			<table className="w-full" {...props} />
		</div>
	);
};

export default Table;
