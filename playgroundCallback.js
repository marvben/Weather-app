// setTimeout(() => {
//   console.log("Hello");
// }, 2000);

const geoPlace = (location, callBackFunc) => {
  const data = ["Ben", "Uche", "Nasa"];

  console.log(data);
  setTimeout(() => {
    data.push(location);
    callBackFunc(data);
  }, 2000);
};

geoPlace("Tony", (data) => {
  console.log(data);
});
