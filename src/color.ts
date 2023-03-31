const nowrap = true

const regexMap = new Map([
    [/ ERROR /i, 'icc-console-line-error-infra'],
    [/ ERROR /i, 'icc-console-line-error'],
    [/ Consume Time| Execute SQL/, 'icc-console-line-sql'],
    [/ WARN /i, 'icc-console-line-warn'],
    [/ DEBUG /i, 'icc-console-line-debug'],
    [/ INFO /i, 'icc-console-line-info'],
])

export function colored() {
    regObs()
}

function regObs() {
    const observer = new MutationObserver(mutations => {

        mutations.forEach(mutation => {
            const target = <HTMLElement>mutation.target
            let classList = target.classList
            if (classList.contains('CodeMirror-code')) {
                colorLines(target)
            }
            if (classList.contains('CodeMirror-line')) {
                colorLine(target)
            }
        })
    })

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    })
}

function colorLines(codeMirrorCodeEl: HTMLElement) {
    const lines = codeMirrorCodeEl.getElementsByClassName('CodeMirror-line')
    Array.from(lines).forEach(line => colorLine(line))
}

function colorLine(line: Element) {
    const classList = line.classList
    if (classList.contains('icc-console-line')) {
        return
    }

    line.classList.add('icc-console-line')
    if (nowrap) {
        line.classList.add('icc-console-line-nowrap')
    }

    if (line && line.innerHTML) {


        const lineHtml = line.innerHTML
        for (let regex of regexMap.keys()) {
            if (regex.test(lineHtml)) {
                line.classList.add(regexMap.get(regex)!)
                return
            }
        }
    }
}
