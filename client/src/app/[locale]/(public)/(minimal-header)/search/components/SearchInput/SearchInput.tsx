import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { SearchIcon } from "lucide-react";

type Props = {
    value: string;
    onChange: (value: string) => void;
    loading: boolean;
};

function SearchInput({ value, onChange, loading }: Props) {
    return (
        <InputGroup>
            <InputGroupInput
                placeholder="Search..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <InputGroupAddon>
                {loading ? <Spinner /> : <SearchIcon />}
            </InputGroupAddon>
        </InputGroup>
    );
}

export default SearchInput;
