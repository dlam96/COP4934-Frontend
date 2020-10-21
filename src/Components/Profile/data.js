import { useMemo } from "react";
import faker from "faker";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const getUser = () => {
  let firstName = faker.name.firstName();
  let lastName = faker.name.lastName();
  let status = getRandomInt(2);
  return {
    name: `${firstName} ${lastName}`,
    initials: `${firstName.substr(0, 1)}${lastName.substr(0, 1)}`,
    description: faker.company.catchPhrase(),
    avatar: faker.internet.avatar(),
    isOnline: status,
  };
};

const sortUser = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

export const useUserRecords = (count) => {
  const allUsers = useMemo(
    () => new Array(count).fill(true).map(getUser).sort(sortUser),
    [count]
  );

  return allUsers;
};
