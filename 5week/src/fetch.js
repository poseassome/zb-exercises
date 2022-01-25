/**
 * import & export는 심화 강의를 통해 배우게 됩니다.
 * 그전에는 한 파일에서만 코드를 작성해도 해도 문제는 없습니다.
 */

// TODO: API 키를 따로 발급하여 넣어주세요
const CLIENT_ID = "Iv1.7bef513da2dda265";
const CLIENT_SECRET = "1843268c8852298031fa0682824ac967afc5ba02";

export function fetchUser(userName) {
  return fetch(
    `https://api.github.com/users/${userName}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return "깃헙과 연동이 필요합니다.";
    }
  });
}

export function fetchRepos(userName) {
  return fetch(
    `https://api.github.com/users/${userName}/repos?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
  ).then((response) => {
    return response.json();
  });
}

export function fetchRepoLanguage(userName, repoName) {
  return fetch(
    `https://api.github.com/repos/${userName}/${repoName}/languages?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
  ).then((response) => {
    return response.json();
  });
}
