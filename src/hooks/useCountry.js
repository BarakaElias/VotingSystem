import { useState } from "react";
import country_mnos_list from "../utils/country_mnos_list";
const useCountry = (ctry) => {
  const mno_list = country_mnos_list.filter(
    (country_list) => country_list.country === ctry
  );
  console.log(mno_list[0].mno_list);
  const [country, setCountry] = useState({ country: "" });

  setCountry({ country: ctry });

  return [country];
};

export default useCountry;
