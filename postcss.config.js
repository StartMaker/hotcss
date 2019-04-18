module.exports = {
    exec: true,
    plugins: [
        require('precss'),
        require('autoprefixer')({
            browsers: [
                "> 0.01%"
            ]
        })
    ]
};