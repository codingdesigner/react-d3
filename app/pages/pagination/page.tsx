import { Pagination } from "@/app/components/Pagination";

export default function Home() {
  return (
    <main>
      <h1>Pagination</h1>
      <div>
        <Pagination totalPages={30} maxVisiblePages={11}/>
        {/* <Pagination curPage={1} totalPages={11} maxVisiblePages={11}/> */}
        {/* <Pagination curPage={1} totalPages={30} maxVisiblePages={11}/> */}
        {/* <Pagination curPage={6} totalPages={30} maxVisiblePages={11}/> */}
        {/* <Pagination curPage={7} totalPages={30} maxVisiblePages={11}/> */}
        {/* <Pagination curPage={24} totalPages={30} maxVisiblePages={11}/> */}
        {/* <Pagination curPage={27} totalPages={30} maxVisiblePages={11}/> */}
        {/* <Pagination curPage={30} totalPages={30} maxVisiblePages={11}/> */}
      </div>
    </main>
  );
}
