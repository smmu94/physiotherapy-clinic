import PostDetail from "@/components/ui/postDetail";
import { Suspense } from "react";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id?: string }>;
}){
  const resolvedParams =  await params;
  const id = resolvedParams.id;

  return (
    <div className="flex flex-col items-center">
        <Suspense fallback={<p>Cargando post...</p>}>
            <PostDetail id={id} />
        </Suspense>
    </div>
    
  );
}
