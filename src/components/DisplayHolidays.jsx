import React from "react";
import styled from "styled-components";
function DisplayHolidays() {
  const ENDPOINT = "https://openholidaysapi.org/";
  const [selectedCountry, setSelectedCountry] = React.useState("");
  const [countries, SetCountries] = React.useState([]);
  const [holidays, setHolidays] = React.useState([]);
  const [status, setStatus] = React.useState("idle");
  React.useEffect(() => {
    async function getCountries(ENDPOINT) {
      const url = ENDPOINT + "Countries";
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
      SetCountries(json);
    }
    getCountries(ENDPOINT);
  }, [selectedCountry]);

  React.useEffect(() => {
    async function getHolidaysForCountry() {
      setStatus("loading");
      const currentYear = new Date().getFullYear();
      const url = `https://openholidaysapi.org/PublicHolidays?countryIsoCode=${selectedCountry}&languageIsoCode=EN&validFrom=${currentYear}-01-01&validTo=${currentYear}-12-30`;
      const response = await fetch(url);
      const json = await response.json();
      setHolidays(json);
      setStatus("complete");
      console.log(json);
    }
    selectedCountry !== "" && getHolidaysForCountry();
  }, [selectedCountry]);
  //   async function getHolidaysForCountry(ENDPOINT) {
  //     setStatus("Loading");
  //     //  'https://openholidaysapi.org/PublicHolidays?countryIsoCode=CH&languageIsoCode=DE&validFrom=2022-01-01&validTo=2022-06-30'
  //     const url = ENDPOINT + `${country}`;
  //     const response = await fetch(url);
  //     const json = await response.json();
  //     console.log(json);
  //   }

  return (
    <Main>
      <Label htmlFor="countries">Choose a country</Label>
      <Select
        id="countries"
        autoFocus={true}
        defaultValue={""}
        onChange={(event) => {
          setSelectedCountry(event.target.value);
        }}
      >
        <option disabled={true} value={""}>
          Pick a country
        </option>
        {countries?.map((country) => (
          <option key={country.isoCode} value={country.isoCode}>
            {country.name[0].text}
          </option>
        ))}
      </Select>
      <h2>List of holidays:</h2>
      {status === "idle" && <p>Nothing to display</p>}
      {status === "loading" && <p>Loading List of Holidays</p>}
      {/* {status === "complete" &&
        holidays.map((item) => (
          <ul>
            <li key={item.startDate}>
              {" "}
              {item.startDate} <span>{item.name[0].text} </span>
            </li>
          </ul>
        ))} */}
      {status === "complete" && (
        <HolidayList>
          {holidays.map((item) => (
            <List key={item.id}>
              <DateSpan>{item.startDate} </DateSpan>
              <Span>{item.name[0].text} </Span>
            </List>
          ))}
        </HolidayList>
      )}
    </Main>
  );
}

const Label = styled.label`
  display: inline-block;
  padding: 0.5rem;
  font-size: 1rem;
`;
const Select = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  max-width: 200px;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Span = styled.div`
  font-weight: bold;
  padding-left: 1rem;
`;

const DateSpan = styled.div`
  padding-left: 0.5rem;
`;

const HolidayList = styled.ol`
  text-align: justify;
  &:nth-child(odd) {
    background: #8b0836;
  }
`;

const List = styled.li`
  display: flex;
  padding: 0.4rem;
  font-size: 1rem;
  background: #57534d;
  color: #1c1917;
  &:nth-child(odd) {
    background: #ffa1ad;
    color: #8b0836;
  }
`;
export { DisplayHolidays };
