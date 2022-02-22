/* eslint-disable max-len */

import React from 'react'
import ScrollArea from '../chui-components/scroll-area.jsx'

const About = () => (
  <ScrollArea style={{
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '4px'
  }} scroll="y">
    <span style={{ alignSelf: 'center' }}>NavalArt 摆烂盒子</span>
    <span style={{ alignSelf: 'center' }}>by Chuigda WhiteGive (第七漂浮物建造厂)</span>
    <br/>
    <span>本程序用于快速生成 NavalArt 中的舰艏与 24 段圆弧，非常适合<del>摆烂</del>大量下饺子。一定程度上来说就是一个高级点的 PTB 辅助设计。</span>
    <br/>
    <span>本程序是开源软件，访问 <a href="https://github.com/chuigda/Bailan-box">github.com/chuigda/Bailan-box</a> 来获取源代码。</span>
    <br />
    <hr style={{ width: '100%' }} />
    <span style={{ alignSelf: 'center' }}>致谢 (排名不分先后)</span>
    <div style={{ alignSelf: 'center' }}>
      <ul className="about-listing">
        <li>nog</li>
        <li>otig</li>
        <li>摩尔曼斯克</li>
        <li>拉莱耶造船厂</li>
        <li>20米大分段靶舰专家河马</li>
        <li>Anget12君</li>
        <li>你滴小将，无限扫射</li>
        <li>super plz</li>
        <li>WHF</li>
        <li>Moskau/AwayOfaLife</li>
        <li>8ig</li>
        <li>eig</li>
      </ul>
    </div>
    <br />
    <hr style={{ width: '100%' }}/>
    <span style={{ alignSelf: 'center' }}>许可证</span>
    <br/>
    <span>MIT License</span>
    <br />
    <span>Copyright 2022 Chuigda WhiteGive&lt;icey@icey.tech&gt;</span>
    <br />
    <span>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the &quot;Software&quot;), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</span>
    <br />
    <span>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</span>
    <br />
    <span>THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</span>
    <br />
    <hr style={{ width: '100%' }}/>
    <span>程序使用了以下第三方开源软件：</span>
    <br />
    <span style={{ alignSelf: 'center' }}>React</span>
    <br />
    <span>MIT License</span>
    <br />
    <span>Copyright (c) Facebook, Inc. and its affiliates.</span>
    <br />
    <span>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the &quot;Software&quot;), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</span>
    <br />
    <span>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</span>
    <br />
    <span>THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</span>
    <br />
    <br />
    <span style={{ alignSelf: 'center' }}>PropTypes</span>
    <br />
    <span>MIT License</span>
    <br />
    <span>Copyright (c) 2013-present, Facebook, Inc.</span>
    <br />
    <span>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the &quot;Software&quot;), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</span>
    <br />
    <span>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</span>
    <br />
    <span>THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</span>
    <br />
    <br />
    <span style={{ alignSelf: 'center' }}>i18next</span>
    <br />
    <span>MIT License</span>
    <br />
    <span>Copyright (c) 2022, i18next</span>
    <br />
    <span>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the &quot;Software&quot;), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</span>
    <br />
    <span>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</span>
    <br />
    <span>THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</span>
    <br />
    <br />
    <span style={{ alignSelf: 'center' }}>react-i18next</span>
    <br />
    <span>MIT License</span>
    <br />
    <span>Copyright (c) 2021, i18next</span>
    <br />
    <span>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the &quot;Software&quot;), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</span>
    <br />
    <span>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</span>
    <br />
    <span>THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</span>
    <br />
    <br />
    <span style={{ alignSelf: 'center' }}>JSZip</span>
    <br />
    <span>JSZip is dual licensed. At your choice you may use it under the MIT license or the GPLv3 license.</span>
    <br />
    <span>MIT License</span>
    <br />
    <span>Copyright (c) 2009-2016 Stuart Knightley, David Duponchel, Franz Buchinger, António Afonso</span>
    <br />
    <span>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the &quot;Software&quot;), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</span>
    <br />
    <span>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</span>
    <br />
    <span>THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</span>
    <br />
    <br />
    <span style={{ alignSelf: 'center' }}>FileSaver.js</span>
    <br />
    <span>MIT License</span>
    <br />
    <span>Copyright © 2016 Eli Grey.</span>
    <br />
    <span>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the &quot;Software&quot;), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</span>
    <br />
    <span>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</span>
    <br />
    <span>THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</span>
    <br />
    <br />
    <span style={{ alignSelf: 'center' }}>fast-xml-parser</span>
    <br/>
    <span>MIT License</span>
    <br />
    <span>Copyright (c) 2017 Amit Kumar Gupta</span>
    <br />
    <span>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the &quot;Software&quot;), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</span>
    <br />
    <span>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</span>
    <br />
    <span>THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</span>
    <br />
    <hr style={{ width: '100%' }} />
    <span>本程序使用的中文字体 IPix 从 <a href="https://purestudio.itch.io/ipix">purestudio.itch.io</a> 取得</span>
    <span>本程序使用的英文字体 Less Perfect DOS VGA 从 <a href="https://laemeur.sdf.org/fonts/">laemeur.sdf.org</a> 取得</span>
    <span>本程序使用的 Windows 系列图标从 <a href="https://win98icons.alexmeub.com/">win98icons.alexmeub.com</a> 取得</span>
    <span>本程序使用的 Windows 光标从 <a href="http://www.rw-designer.com/">www.rw-designer.com</a> 取得</span>

  </ScrollArea>
)

export default About
