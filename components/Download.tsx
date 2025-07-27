import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

const Download = () => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="!bg-slate-800 border-blue-950 !text-white">
          Download Questions
        </MenubarTrigger>
        <MenubarContent className="!bg-slate-800 !text-white">
          <MenubarItem className="px-0 py-0">
            <a
              className="w-full h-full px-2 py-1.5"
              href="/files/data_sc_and_ml_questions.docx"
              download={true}
            >
              Word Doc
            </a>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="px-0 py-0">
            <a
              className="w-full h-full px-2 py-1.5"
              href="/files/data_sc_and_ml_questions.pdf"
              download={true}
            >
              Pdf
            </a>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Download;
