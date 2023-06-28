import { useState } from "react";
import { categories } from "../../../data/dates";

import Table from "./Table";

const TableBoard = () => {
  const [type, setType] = useState('Universidad')
  

  return (
    <div className="mx-24 my-10">
      <div className=" sm:rounded-lg flex justify-start " >
        {categories.map((category) => (
            <button
            onClick={() => setType(category)} 
            className={` px-4 py-2 w-fit rounded-t-xl text-lg border-t-2 border-x-2  border-amber-200 hover:bg-amber-200 ${type === category ? 'bg-amber-200 font-medium' : 'bg-amber-100 font-normal'}`}>{category}</button>
        ))}
      </div>
      <Table category={type} key={type}/>

    </div>
  );
};
export default TableBoard;
