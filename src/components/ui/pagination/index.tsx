"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const goToPage = (page: number) => {
    router.push(`?page=${page}`);
  };

  return (
    <div className="flex items-center gap-3 mt-10 w-full justify-center">
      <Button
        style="secondary"
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
        className="px-3 py-2"
      >
        <FaChevronLeft />
      </Button>
      <div className="flex gap-2">
        {pages.map((page) => (
          <Button
            key={page}
            style={page === currentPage ? "primary" : "secondary"}
            disabled={page === currentPage}
            onClick={() => goToPage(page)}
            className={`px-4 py-2 ${page === currentPage ? "cursor-default" : ""}`}
          >
            {page}
          </Button>
        ))}
      </div>
      <Button
        style="secondary"
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
        className="px-3 py-2"
      >
        <FaChevronRight />
      </Button>
    </div>
  );
}
