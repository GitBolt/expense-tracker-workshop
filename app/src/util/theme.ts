import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    components: {
        Alert: {
            baseStyle: (props: any) => {
                const { status } = props;

                const base = {
                    container: {
                        m: "0 2rem",
                        padding: "1rem 1rem",
                        width: "5rem",
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)",
                    },
                    icon: {
                        width: "2rem",
                        height: "2rem"
                    },
                    closeButton: {
                        color: "white",
                        _hover: {
                            background: "white",
                        },
                    },
                    title: {
                        mt: "1px",
                        fontSize: "1.8rem",
                        color: "#e3e3e3",
                        fontWeight: "500"
                    }
                };

                const successBase = status === "success" && {
                    container: {
                        ...base.container,
                        background: "linear-gradient(45deg, #29494f, #1a7558)",
                    },
                    icon: {
                        ...base.icon,
                        color: "#00D70F"
                    },
                    title: {
                        ...base.title,
                    },
                };

                const infoBase = status === "info" && {
                    container: {
                        ...base.container,
                        background: "linear-gradient(45deg,#2d2d97, #5858a8)",
                    },
                    icon: {
                        ...base.icon,
                        color: "blue.100"
                    },
                    title: {
                        ...base.title,
                    },
                };

                const errorBase = status === "error" && {
                    container: {
                        ...base.container,
                        background: "linear-gradient(45deg,#732020, #bb5050)",
                    },
                    icon: {
                        ...base.icon,
                        color: "red"
                    },
                    title: {
                        ...base.title,
                    },
                };

                const loadingBase = status === "loading" && {
                    container: {
                        ...base.container,
                        background: "linear-gradient(45deg,#a63a59, #c4379a)",
                    },
                    spinner: {
                        ...base.icon,
                        color: "white",

                    },
                    title: {
                        ...base.title,
                    },
                };
                return {
                    ...base,
                    ...successBase,
                    ...infoBase,
                    ...errorBase,
                    ...loadingBase,
                };
            },
        },
    }
})