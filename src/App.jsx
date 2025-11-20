import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Row>
        <div>
          <Heading as="h1">Booking Oasis</Heading>
          <Button variation="primary" size="medium">
            Click
          </Button>
        </div>
      </Row>
    </>
  );
}
