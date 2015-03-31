using System;
using System.Web;
using System.Text.RegularExpressions;

public static class HtmlSanitizer
{
    private static Regex _tags = new Regex("<[^>]*(>|$)",
        RegexOptions.Singleline |
        RegexOptions.ExplicitCapture |
        RegexOptions.Compiled);

    private static Regex _whitelist = new Regex(@"
        ^</?(b(lockquote)?|code|d(d|t|l|el)|em|h(1|2|3)|i|kbd|
        li|ol|p(re)?|s(ub|up|trong|trike)?|ul)>$|
        ^<(b|h)r\s?/?>$",
        RegexOptions.Singleline |
        RegexOptions.ExplicitCapture |
        RegexOptions.Compiled |
        RegexOptions.IgnorePatternWhitespace);

    private static Regex _whitelist_a = new Regex(@"
        ^<a\s
        href=""(\#\d+|(https?|ftp)://[-a-z0-9+&@#/%?=~_|!:,.;\(\)]+)""
        (\stitle=""[^""<>]+"")?\s?>$|
        ^</a>$",
        RegexOptions.Singleline |
        RegexOptions.ExplicitCapture |
        RegexOptions.Compiled |
        RegexOptions.IgnorePatternWhitespace);

    private static Regex _whitelist_img = new Regex(@"
        ^<img\s
        src=""https?://[-a-z0-9+&@#/%?=~_|!:,.;\(\)]+""
        (\swidth=""\d{1,3}"")?
        (\sheight=""\d{1,3}"")?
        (\salt=""[^""<>]*"")?
        (\stitle=""[^""<>]*"")?
        \s?/?>$",
        RegexOptions.Singleline |
        RegexOptions.ExplicitCapture |
        RegexOptions.Compiled |
        RegexOptions.IgnorePatternWhitespace);


    public static string AsSafeHtml(this string html)
    {
        string tagname;
        Match tag;

        // match every HTML tag in the input
        MatchCollection tags = _tags.Matches(html);
        for (int i = tags.Count - 1; i > -1; i--)
        {
            tag = tags[i];
            tagname = tag.Value.ToLowerInvariant();

            if (!(_whitelist.IsMatch(tagname) || _whitelist_a.IsMatch(tagname) || _whitelist_img.IsMatch(tagname)))
            {
                html = html.Remove(tag.Index, tag.Length);
            }
        }
        return html;
    }
}