import { CrossCircledIcon } from "@radix-ui/react-icons";
import { useState, useMemo, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Transaction_failed() {
  const pathname = usePathname();
  const router = useRouter();

  const [path, setPath] = useState<string>("");

  const decodedPathname = useMemo(() => decodeURIComponent(pathname), []);

  const returnBtnClick = () => {
    if (decodedPathname.split("/")[1] === "training") {
      router.push("/training");
    } else {
      router.push("/mentorship");
    }
  };

  useEffect(() => {
    setPath(decodedPathname.split("/")[1]);
  }, []);
  return (
    <div className="lg:w-2/4 w-[95%] lg:h-auto md:h-3/4 md:w-3/4 h-full my-8 shadow-md shadow-[#0000000D] rounded-md px-4 py-6 flex flex-col justify-between items-center">
      <div className="w-2/4 flex flex-col gap-6 justify-center items-center m-auto">
        <div className="w-full my-4 flex justify-center items-center">
          <CrossCircledIcon width="100%" height="200px" />
        </div>

        <p className="lg:my-4 text-[red] font-bold md:text-3xl text-2xl text-center my-4">
          Transaction Failed
        </p>
      </div>

      <button
        className="bg-[red] py-4 px-2 w-full my-4 text-white rounded-md font-bold"
        onClick={returnBtnClick}
      >
        Back to {path === "mentorship" ? "mentoring" : path}
      </button>
    </div>
  );
}
