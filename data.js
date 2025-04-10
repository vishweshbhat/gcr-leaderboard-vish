const csv = require("csv-parser");
const fs = require("fs");
const results = [];
const resultsWithRank = [];
const arcadeGames = "no. of Arcade Games Completed",
    triviaGames = "no. of Trivia Games Completed",
    labFreeCourses = "no. of Lab-free Courses Completed";

fs.createReadStream("data/data.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    let id = 0;
    results.forEach((result) => {
      delete result["Enrolment Date & Time"];
      delete result["Google Cloud Skills Boost Profile URL"];
      delete result["Institution"];
      delete result["Student Email"];
      result.id = id++;
    });

    // Sorting by number of arcade games, trivia games, and lab-free courses
    results.sort(
      (a, b) =>
        Number(b[arcadeGames]) +
        Number(b[triviaGames]) +
        Number(b[labFreeCourses]) -
        (Number(a[arcadeGames]) +
          Number(a[triviaGames]) +
          Number(a[labFreeCourses])) ||
        a["User Name"] - b["User Name"]
    );

    let rank = 1;
    results[0]["Rank"] = rank;

    for (let pointer = 1; pointer < results.length; pointer++) {
      let totalScorePrevious = 
        Number(results[pointer - 1][arcadeGames]) + 
        Number(results[pointer - 1][triviaGames]) + 
        Number(results[pointer - 1][labFreeCourses]);

      let totalScoreCurrent = 
        Number(results[pointer][arcadeGames]) + 
        Number(results[pointer][triviaGames]) + 
        Number(results[pointer][labFreeCourses]);

      if (totalScoreCurrent === 0) {
        rank++;
        results[pointer]["Rank"] = rank;
      } else if (totalScorePrevious === totalScoreCurrent) {
        results[pointer]["Rank"] = results[pointer - 1]["Rank"];
      } else {
        rank++;
        results[pointer]["Rank"] = rank;
      }
    }

    // Building the results with only the required fields
    results.forEach((result) => {
      let obj = {
        Rank: result["Rank"],
        "User Name": result["User Name"], // Using "User Name" as the student's name field
        "# of Arcade Games Completed": result[arcadeGames],
        "# of Trivia Games Completed": result[triviaGames],
        "# of Lab-free Courses Completed": result[labFreeCourses],
        id: result["id"],
      };

      resultsWithRank.push(obj);
    });

    fs.writeFile(
      "data/data.json",
      JSON.stringify({
        resultsWithRank,
        buildDate: new Date(Date.now()).toDateString(),
      }),
      (err) => {
        if (err) throw err;
        console.log("Data file has been saved!");
      }
    );
  });
