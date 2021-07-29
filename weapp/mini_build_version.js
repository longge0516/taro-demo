let miniBuildVersion = "202105121453_100.200";
try {
    if (typeof wx !== 'undefined') {
        wx["buildVersion"] = miniBuildVersion;
    }
} catch (e) {
}

module.exports = miniBuildVersion;
