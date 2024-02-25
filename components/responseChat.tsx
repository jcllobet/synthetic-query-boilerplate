import { Button } from "@/components/ui/button";

interface ResponseChatProps {
  title: string;
  response: string;
}

export function ResponseChat({ title, response }: ResponseChatProps) {
  return (
    <div className="p-4 rounded-lg bg-white shadow">
      <div className="p-6 grid gap-4">
        <div className="flex items-center justify-between">
          <div className="prose max-w-none">
            <p>{response}</p>
          </div>
          <Button className="justify-self-end" size="icon" variant="ghost">
            <CopyIcon className="w-4 h-4" />
            <span className="sr-only">Copy</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

function CopyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}
