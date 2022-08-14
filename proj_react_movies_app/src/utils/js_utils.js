export const JSUtils = {
    truncate: function (input) {
        if (input.length > 130) {
            return input.substring(0, 130) + '...';
        }
        return input;
    }
}
