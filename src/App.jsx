import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Heading from "./ui/Heading";

export default function App() {
  return (
    <>
      <GlobalStyles />
      <div>
        <Heading as="h1">Booking Oasis</Heading>
        <Button>Click</Button>
      </div>
    </>
  );
}
