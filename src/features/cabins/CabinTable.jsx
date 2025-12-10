import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

export default function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) {
    return <Spinner />;
  }

  // FILTER
  const filterValue = searchParams.get("discount") || "all";

  const filters = {
    all: () => true,
    "with-discount": (c) => c.discount > 0,
    "no-discount": (c) => c.discount === 0,
  };

  const filteredCabins = cabins.filter(filters[filterValue]);

  // Sorting
  const sortValue = searchParams.get("sortBy") || "name-asc";

  const sorters = {
    "name-asc": (a, b) => a.name.localeCompare(b.name),
    "name-desc": (a, b) => b.name.localeCompare(a.name),
    "regularPrice-asc": (a, b) => a.regularPrice - b.regularPrice,
    "regularPrice-desc": (a, b) => b.regularPrice - a.regularPrice,
    "maxCapacity-asc": (a, b) => a.maxCapacity - b.maxCapacity,
    "maxCapacity-desc": (a, b) => b.maxCapacity - a.maxCapacity,
  };

  const sortedCabins = [...filteredCabins].sort(sorters[sortValue]);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}
