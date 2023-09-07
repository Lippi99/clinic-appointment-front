import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { HiTranslate } from "react-icons/hi";
import Link from "next-intl/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export const TransLation = () => {
  const path = usePathname();
  const url = path.replace("pt/", "").replace("en/", "");

  const t = useTranslations("Index");

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button disableAnimation className="bg-transparent outline-none">
          <HiTranslate className="text-5xl text-white" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="en">
          <Link
            className="block h-full w-full text-white"
            href={url}
            locale="en"
          >
            {t("translation.en")}
          </Link>
        </DropdownItem>
        <DropdownItem key="pt">
          <Link
            className="block h-full w-full text-white"
            href={url}
            locale="pt"
          >
            {t("translation.pt")}
          </Link>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
