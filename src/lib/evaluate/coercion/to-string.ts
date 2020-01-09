export const toString = (value: any) => {
    switch (typeof value) {
        case "string":
            return value;
        case "number":
            return '' + value;
    }
};