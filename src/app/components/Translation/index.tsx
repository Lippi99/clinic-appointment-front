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

export const TransLation = () => {
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
          <Link className="block h-full w-full text-white" href="/" locale="en">
            {t("translation.en")}
          </Link>
        </DropdownItem>
        <DropdownItem key="pt">
          <Link className="block h-full w-full text-white" href="/" locale="pt">
            {t("translation.pt")}
          </Link>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
