import "./styles.css";
import { Octokit } from "@octokit/core";
const octokit = new Octokit({
  auth: `226f11727e5c49c3cf24cdfa1c83aa01dde26319`
});
console.tap = (v, ...l) => (console.log(v, ...l), v);
const updateStr = (str) => `${new Date().toISOString()}\n${str}`;

function get() {
  return octokit
    .request("GET /repos/{owner}/{repo}/contents/{path}", {
      owner: "easilyBaffled",
      repo: "routine-parse-tag-sort",
      path: "src/list.md"
    })
    .then(console.tap)
    .then(({ data }) => [data, updateStr(window.atob(data.content))])
    .then(console.tap)
    .then(write)
    .catch(console.error);
}

function write([fileData, str]) {
  return octokit
    .request("PUT /repos/{owner}/{repo}/contents/{path}", {
      owner: "easilyBaffled",
      repo: "routine-parse-tag-sort",
      path: "src/list.md",
      message: "trying programetic writes",
      content: window.btoa(str),
      sha: fileData.sha
    })
    .then(console.log)
    .catch(console.error);
}

get();

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
