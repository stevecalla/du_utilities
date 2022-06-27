
let recursion = 'hello';
document.querySelector('div').innerHTML = recursion;

// https://www.loom.com/share/e57009d6a1ea4232bbfc00a83cb1d141
// https://leetcode.com/problems/generate-parentheses/submissions/

test(3);
let openings = 0;
let closings = 0;

function test(n) {
  console.log('n=', n);
  const answers = [];

  const recurse = (openings, closings, cur) => {
    // console.log('recurse', n, openings, closings, cur)
    //base case
    if (openings === n && closings === n) {
      // answers.push(cur);
      answers.push(cur.join(''));
      console.log('base case=', openings, closings, cur);
      console.log('base case=', answers);
      return;
    }
  
    //recurse case
    //less openings than closings
    if (openings < n) {
      console.log('opening case_1=', openings, closings, cur);
      recurse (openings + 1, closings, [...cur, '(']);
      console.log('opening case_2=', openings, closings, cur);
    }
  
    //less closings than openings
    if (openings > closings) {
      console.trace();
      console.log('closing case_1=', openings, closings, cur);
      recurse(openings, closings + 1, [...cur, ')'])
      console.log('closing case_2=', openings, closings, cur);
    }
  }

  // console.trace();
  console.log(answers);
  recurse(0, 0, []);
  console.log(answers);
  return answers;
}

  // // console.log(answers)
  // recurse();
// }