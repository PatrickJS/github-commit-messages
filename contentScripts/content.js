let done = false;

function main() {
  const node1 = document.querySelectorAll('.js-commits-list-item')
  const node2 = Array.from(node1);
  const hasCommits = node2 && node2.length;
  let hasScope = false;

  const button = document.querySelector('.file-navigation')
  let toggle = false

  if (hasCommits && !done) {
    node2.forEach(el => {
      const a = el.querySelector('a')

      // get the full message
      // const raw = a.getAttribute('aria-label').match(/^.*$/m)[0];

      const textContent = a.textContent
      // split message from scope
      const exp = /(^[a-z]*(\(.+\))?: )(.+)/
      const match = exp.exec(textContent)
      if (match) {
        hasScope = true;
        const scope = match[1];
        const msg = match[3];
        // const p = a.parentElement;
        const span = document.createElement('span')
        span.style.display = 'none';
        span.classList.add('commit-scope')
        const message = document.createTextNode(msg)

        span.textContent = scope;
        el.onmouseover = () => {
          if (!toggle)
            span.style.display = 'inline'
        }
        el.onmouseout = () => {
          if (!toggle)
            span.style.display = 'none'
        }
        a.innerText = ''

        a.appendChild(span)
        a.appendChild(message)
      }
    });

    done = true;
  }
  
  if (hasScope && hasCommits && button) {
    const btn = document.createElement('button');
    btn.classList.add('btn');
    btn.classList.add('btn-outline');
    btn.style.marginLeft = '1em';
    btn.textContent = 'Show Scope';
    button.appendChild(btn);
    btn.onclick = () => {
      const commits = Array.from(document.querySelectorAll('.commit-scope'))
      toggle = !toggle
      btn.textContent = (toggle ? 'Hide' : 'Show') + ' Scope';
      commits.forEach(el => {
        el.style.display = toggle ? 'inline' : 'none'
      })
    }
  }
}
document.addEventListener('DOMContentLoaded', main);
