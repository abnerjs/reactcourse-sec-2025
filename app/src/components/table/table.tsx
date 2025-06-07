import type { ComponentProps } from 'react'

interface TableProps extends ComponentProps<'table'> {}

const Table = (props: TableProps) => {
  return (
    <div className="flex flex-col border border-white/10 rounded-lg mb-10">
      <table className="w-full" {...props} />
    </div>
  )
}

export default Table
