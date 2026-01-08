
const code = `<!-- parentComponent.html -->
<template>
    <c-child-component 
        record-name={contactName}
        is-active={status}>
    </c-child-component>
</template>`;

let highlighted = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

console.log("ESCAPED CODE:\n" + highlighted);

// New Regex: Allow { ... } and unquoted values in attributes
// Old: ((?:\s+[\w-]+(?:=__STRING_\d+__)?)*\s*)
// New: ((?:\s+[\w-]+(?:=(?:__STRING_\d+__|{[^}]+}|[^>\s]+))?)*\s*)
const regex = /(&lt;\/?)(\w[\w-]*)((?:\s+[\w-]+(?:=(?:__STRING_\d+__|{[^}]+}|[^>\s]+))?)*\s*)(\/?>|&gt;)/gs;

let match;
while ((match = regex.exec(highlighted)) !== null) {
    console.log("MATCH FOUND:");
    console.log("Full match:", match[0]);
    console.log("Group 1 (Open):", match[1]);
    console.log("Group 2 (Tag):", match[2]);
    console.log("Group 3 (Attrs):", match[3]);
    console.log("Group 4 (Close):", match[4]);
    console.log("---");
}
