import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const nominationsSlice = createSlice({
  name: "nominations",
  initialState: {
    nominations: [
      {
        id: 1,
        nominator: "Brycen Masmo",
        nominator_title: "Mr",
        nominator_phonenumber: "255692463373",
        nominator_company: "Bryce Corps",
        nominator_email: "bryce@brycecorps.com",
        nominee: "Baraka Urio",
        nominee_title: "Mr",
        nominee_company_address: "Sam Nujoma, Dar es Salaam, Arusha",
        nominee_company: "Aim Firms",
        nominee_email: "baraka@aimfirms.com",
        nominee_phonenumber: "255624327900",
        category: "Afya Lifetime Achievement Award",
        questions: [
          {
            question:
              "What makes this indidvidual stand out when compared to his or her peers in the healthcare sector?",
            answer:
              "The thing that makes this individual stand out is becuase lorem ipsum dolar sit at met. Unsplash from the assets images that contains photos from unsplash. This is meant to fill up the space of the",
          },
          {
            question:
              "How would you objectively quantify the achievements of the nominee?",
            answer:
              "The thing that makes this individual stand out is becuase lorem ipsum dolar sit at met. Unsplash from the assets images that contains photos from unsplash. This is meant to fill up the space of the",
          },
          {
            question:
              "What are some of the nominee's notable achievments over the last year or so?",
            answer:
              "The thing that makes this individual stand out is becuase lorem ipsum dolar sit at met. Unsplash from the assets images that contains photos from unsplash. This is meant to fill up the space of the",
          },
        ],
      },
    ],
  },
  reducers: {
    setNominations: (state, payload) => {
      state.nominations = [];
    },
  },
});

export function fetchNominations() {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/voters");
      dispatch(nominationsSlice.actions.setNominations(response.data));
    } catch (e) {
      console.log(e);
    }
  };
}

export default nominationsSlice.reducer;
