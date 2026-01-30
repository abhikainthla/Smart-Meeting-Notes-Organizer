import { Input, InputGroup, Kbd } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"

const SearchInput = () => {
  return (
     <InputGroup flex="1" startElement={<LuSearch />}>
    <Input placeholder="Search Notes" />
  </InputGroup>
  )
}

export default SearchInput