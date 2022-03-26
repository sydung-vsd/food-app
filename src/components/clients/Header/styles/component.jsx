import { FormGroup, IconSearch, InputSearch } from './style';

export const Search = () => {
  return (
    <form>
      <FormGroup>
        <InputSearch placeholder="Tìm kiếm..." />
        <IconSearch size="large" />
      </FormGroup>
    </form>
  );
};
