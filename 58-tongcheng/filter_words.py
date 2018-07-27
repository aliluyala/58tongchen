from fontTools.ttLib import TTFont
import pymongo
import woff2otf
def map_rule():
    woff2otf.convert("58.woff", "58.otf")
    baseFont = TTFont('base.otf')
    maoyanFont = TTFont('58.otf')
    uniList = maoyanFont['cmap'].tables[0].ttFont.getGlyphOrder()
    numList = []
    baseNumList = [
        '[]', '技', 'E', '大', '硕', '1', '中', '下', '验', '张', '5','杨','黄','男','9','刘','生','吴','应','7','4','校','王','士','M','经','李',
                   '女','专','8','周','赵','无','陈','A','以','B','博','6','3','2','本','科','届','0','高'
                   ]
    baseUniCode = ['.notdef', 'uniE376', 'uniE370', 'uniE374', 'uniE354', 'uniE35B', 'uniE36C', 'uniE35C', 'uniE36D', 'uniE357',
                   'uniE34F', 'uniE34D', 'uniE365', 'uniE34A', 'uniE364','uniE367', 'uniE358', 'uniE34C', 'uniE368', 'uniE35E',
                   'uniE36F', 'uniE351', 'uniE35F', 'uniE36E', 'uniE371', 'uniE36A', 'uniE35A', 'uniE34E', 'uniE361', 'uniE366',
                   'uniE35D', 'uniE356', 'uniE362', 'uniE359', 'uniE355', 'uniE373', 'uniE372', 'uniE349', 'uniE375', 'uniE34B',
                   'uniE350', 'uniE353', 'uniE360', 'uniE352', 'uniE369', 'uniE36B']
    for i in range(46):
        maoyanGlyph = maoyanFont['glyf'][uniList[i]]
        for j in range(46):
            baseGlyph = baseFont['glyf'][baseUniCode[j]]
            if maoyanGlyph == baseGlyph:
                numList.append(baseNumList[j])
                break
    uniList = [i.lower() for i in uniList]

    uniList = [('\\'+i.replace('unie','ue')) for i in uniList]
    return dict(zip(uniList[1:], numList[1:]))

if __name__ == '__main__':
    data = map_rule()
    print(data)
