const StandardTheme = {
    ltr: "ltr",
    rtl: "rtl",
    placeholder: "editor-placeholder",
    paragraph: "editor-paragraph",
    quote: "text-zinc-600 border-l-4 border-zinc-200 ml-5 pl-4",
    heading: {
        h1: "text-4xl font-bold my-3",
        h2: "text-xl font-semibold my-2",
        h3: "text-base font-medium my-1",
        h4: "editor-heading-h4",
        h5: "editor-heading-h5"
    },
    list: {
        nested: {
            listitem: "editor-nested-listitem"
        },
        ol: "list-decimal my-2 ml-5",
        ul: "list-disc my-2 ml-5",
        listitem: "ml-2"
    },
    image: "editor-image",
    link: "editor-link",
    text: {
        bold: "font-bold",
        italic: "italic",
        overflowed: "editor-text-overflowed",
        hashtag: "editor-text-hashtag",
        underline: "underline",
        strikethrough: "line-through",
        underlineStrikethrough: "underline-strikethrough",
        code: "bg-zinc-100 text-pink-600 rounded px-0.5 mx-1"
    },
    code: "editor-code",
    codeHighlight: {
        atrule: "editor-tokenAttr",
        attr: "editor-tokenAttr",
        boolean: "editor-tokenProperty",
        builtin: "editor-tokenSelector",
        cdata: "editor-tokenComment",
        char: "editor-tokenSelector",
        class: "editor-tokenFunction",
        "class-name": "editor-tokenFunction",
        comment: "editor-tokenComment",
        constant: "editor-tokenProperty",
        deleted: "editor-tokenProperty",
        doctype: "editor-tokenComment",
        entity: "editor-tokenOperator",
        function: "editor-tokenFunction",
        important: "editor-tokenVariable",
        inserted: "editor-tokenSelector",
        keyword: "editor-tokenAttr",
        namespace: "editor-tokenVariable",
        number: "editor-tokenProperty",
        operator: "editor-tokenOperator",
        prolog: "editor-tokenComment",
        property: "editor-tokenProperty",
        punctuation: "editor-tokenPunctuation",
        regex: "editor-tokenVariable",
        selector: "editor-tokenSelector",
        string: "editor-tokenSelector",
        symbol: "editor-tokenProperty",
        tag: "editor-tokenProperty",
        url: "editor-tokenOperator",
        variable: "editor-tokenVariable"
    }
};

export default StandardTheme;
