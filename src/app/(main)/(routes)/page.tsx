import Dropzone from "@/components/Dropzone";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 place-content-center m-auto mt-20 text-center rounded-3xl p-10 h-auto w-[80%] bg-[#060937]">
      <Dropzone className="flex flex-col mx-auto relative h-60 w-96 p-8 border" />
    </div>
  );
}
