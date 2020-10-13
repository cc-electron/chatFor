<template>
  <div class="app-container">
    <el-table :data="lists" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.pageviews}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.display_time}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      lists: [{"id":"360000197111135156","title":"Meglosbdd rsugwm uycldphu fmdtxmete vzitbigwbe tdsuds wbwjgbpx pjzi eqtdzdfy klk kyalbxvl.","status":"draft","author":"name","display_time":"2007-11-19 13:33:50","pageviews":1751},{"id":"410000198011121717","title":"Snnu food krtorfyc okvfc brghwdx tzmdeokus fnjqv lasxngclu dhn ovp fgxxyx kwuqbih afx clmnanff irx uevcecs dvkout ribk tcl cbvpidwxhx.","status":"published","author":"name","display_time":"1979-03-10 12:58:57","pageviews":1283},{"id":"350000198403069296","title":"Jmnd qxqqjclrc kglainhjc zogukqbbfw teeipeygpm unalqn hcys puihwvoo xeyogr pdrs jkzzeyc nnfpiktph yjzoceund.","status":"draft","author":"name","display_time":"2000-09-28 06:48:13","pageviews":1766},{"id":"110000200012270406","title":"Bqxouheh uaqkxd gsabvmr zwilqqntw mjblzbgpv kbnmljc vtpr ybf hgfpob liiypms hequz uddven flaaduiss jabw kogmhyzk nnuqg lurgypkwie gjdo wrp.","status":"draft","author":"name","display_time":"2017-07-21 16:02:18","pageviews":2283},{"id":"120000200810251594","title":"Nbqgty psvdclxn lsau bssrd qnnrhprej mendifoybp xqpdetee lqkilc aeyqktrfm illwiboqqm pjqgyh pzufiy vgojdjjie bkwgmtxdk.","status":"published","author":"name","display_time":"2005-02-16 14:14:06","pageviews":4020},{"id":"820000198907173655","title":"Dvedwldzte dsw crmqr hdhrbfck apjmnlh rlfi gigeel gmbult ljzatzvr ocgdhp kpk dofrvecf dtugeo oxckqibl.","status":"draft","author":"name","display_time":"1993-08-22 22:47:02","pageviews":989},{"id":"630000200302244355","title":"Ookjlhlu fuflczyu kprsxum qjtmjbl sstaqasu uajjgfvri upoez lvvumv nibm nenoo mnlxqd ustr szrjzm cqnat vriefqjhhi wgiftwk slj gxhdiry.","status":"published","author":"name","display_time":"1985-04-04 06:46:41","pageviews":1424},{"id":"450000202005026226","title":"Epcyjnrgn sxrftb nrickzuug yfs jzzufhf ohpb lkkgngulm zlrnrhe hxtamglwo rjdrndg ntsybi ujqb reonqvtcg mowg gtjq qwsd ohxx.","status":"draft","author":"name","display_time":"2004-10-05 09:10:43","pageviews":2696},{"id":"340000197402148826","title":"Fnrcdcrz cjkjlfaif rqvwkj qlot bdsip iokkqout genh bcqvgsjh sfluizcoh zls ftumvktyi sunmn rbijqpb sfce ovf ouw jsojk.","status":"draft","author":"name","display_time":"1978-02-11 12:08:42","pageviews":2075},{"id":"510000200811301138","title":"Pjqejy tujzpyw qxj xaprauxt jexg kzczblveg hbym lufj vvrhrzd ecnvhji vnwlcq iympxboxsn rvwx sbyvlsb.","status":"draft","author":"name","display_time":"2010-04-06 22:17:27","pageviews":1144},{"id":"420000200012221711","title":"Niolbyxdg nxui ndmat wubvm kwlqrtgvn gmx csp jkf osjnhmp lgmtqtyg fqzmehk eepdgwg umdfuj ljcsqiis qrmos muumpn.","status":"draft","author":"name","display_time":"2018-09-26 22:49:39","pageviews":2270},{"id":"420000198003133349","title":"Cnitw dcfoeybwwi pnim vczll fxdy snyklyozs yebachjljn odbbv vnkvo qrmzl elilgj fwvbfjaoq gyuhuj mositdw hdmds ahvdrcziz euijvqa.","status":"published","author":"name","display_time":"2008-03-06 18:57:57","pageviews":1289},{"id":"630000198007273866","title":"Tlwgfbyq rfkzbg edcwqz iyftb ourlh cketaw uoyaibkhco ilgthb fetstbvo httvooqw imitwt encr ofu xuiisgpm ncwknxyx upduvum.","status":"deleted","author":"name","display_time":"1984-07-04 02:16:01","pageviews":696},{"id":"530000200406132821","title":"Essol qbot bhqksw fcozbsnf stmqoa ecbsixuqyi hfeqa hrjbyqu yajp uhjmgbxk ffu sgaoo lspsm.","status":"draft","author":"name","display_time":"2018-02-24 10:36:25","pageviews":1149},{"id":"82000019991021538X","title":"Wmsswly iuhq fsbefrnxem ohlwz czeqqmab shujhqgg uhfmqii rwfqfl rqyfoj jhlq itivvtogij roqsd dbcg hqlqsze hsdqso.","status":"draft","author":"name","display_time":"2017-03-20 05:11:44","pageviews":382},{"id":"11000019820802010X","title":"Ouylcptig zcro eqneis oywucdzne fmvpcmof ynfdzctie cxsjqflcv lixjluqx odwbcru bspnusy kodhgosqi kmvgmzbx rgl.","status":"published","author":"name","display_time":"2010-08-18 03:53:31","pageviews":1236},{"id":"150000199105213170","title":"Mvrihh dqlybyx odicky ncfgnodqy xbqvshl nmomniru zictwwg jqsq ifgvj cwdxvuy moojru xyjvcjb djkjo lbqrwp.","status":"published","author":"name","display_time":"2018-11-11 08:39:32","pageviews":1887},{"id":"42000019830108416X","title":"Onsfkjncx hocb wkzcww tyvehkyr pglio vicjsplg sfqpx ucxlu bqeprsuu rgfpgkiu njwmlugnfx sruzuod viusaqjt cgmzustv osblcedlek sqqh ilzwj ygjogqm.","status":"draft","author":"name","display_time":"1982-10-16 03:47:05","pageviews":456},{"id":"510000200806148159","title":"Fhohcl xywcg lumexlc pbndf kiris jjxfvot mmcbsztpi gyul ohnrsvj sgkorwaeux utasrbkhkm.","status":"published","author":"name","display_time":"1980-06-06 01:52:59","pageviews":928},{"id":"420000201711286252","title":"Pqir ouhjosfeh iwbrtmb jytcfs zlxhmq ddftenlxtl jnvpdyve ozgvmzan cxt mycwmv pwkinl gupxpixvk kdmtgk srxvpte dwnc ntxxqv ihtjkeicdo uotacmwfg.","status":"published","author":"name","display_time":"1999-12-05 02:09:44","pageviews":869},{"id":"530000198202234375","title":"Ifsx otjc amrimn tvnjof lvd wdqufhh wkjgxfudqb cruyi nxfhvlo swoxtvqqos pdl nqs.","status":"draft","author":"name","display_time":"2010-09-30 03:29:18","pageviews":4849},{"id":"320000198702166496","title":"Uerh ydl veiy nyqquvm byqftdh nemqbloa iisbrlu nscu ijsewbbmpn reyrw sdinp nfynn fspzbz clppt upnzkhsj qrjhndrzo nlao zgldwkwgv.","status":"draft","author":"name","display_time":"1993-03-27 08:41:02","pageviews":2931},{"id":"220000198204208741","title":"Ztfs kvmlvxps yjdglbquk fmdnwsqw xncrmu qto dwexwclcq ecscp xygmfwpi jnxd vyojx fftue qon ckqhlfdjv tclovi fdbw ylurg udjobcbc jstvhhopp.","status":"draft","author":"name","display_time":"2006-10-24 07:12:20","pageviews":1155},{"id":"620000200505061223","title":"Ascplrj ypxytk mludibqln ygbxgsl jybkpfjeh aihtg arjcrowpku jgndbulc tptah jhlfd xbqi dfbwlp mpxow gzyywtxkf wytvkn.","status":"draft","author":"name","display_time":"2017-10-27 14:07:18","pageviews":3509},{"id":"130000197808223161","title":"Wkwo dypn hpsv engcsxcx yozy olneihkfdq xhibc mfzpbbwcf blofg trol bbaymcqf iglwki fqcu xbhblilqv bpgkh bmqsnzq fbas ubrw tskmmfgjdn.","status":"deleted","author":"name","display_time":"2001-06-25 18:53:52","pageviews":3793},{"id":"430000197911132752","title":"Jecp lvlzws jdffer dbhtlnok yyxcy mpiv uxkrx byrrbki enrwmuf pdbk xklmgbpks wlyxid zxtvcpocf zzqyq.","status":"published","author":"name","display_time":"2004-02-12 15:29:10","pageviews":390},{"id":"360000200101035447","title":"Kpksjf pfnlbsh jqgxi jrsmsdyylu gcbf izydrwzkmy stxnv ubdare pxgqt onwpby dbvocoo xvztmiuvrx pjfllznj dwlcbmdpb bzwlbsjgd nuwkj.","status":"published","author":"name","display_time":"2002-07-27 12:36:41","pageviews":3046},{"id":"420000198701245735","title":"Zbejlgtslk nbpjy smsb gnnrjtkox cqmrdc lpzpmrqg teqqii drtofifuj yekw jleugbmhw vind fvlymcsdb tvbk pvjrkznj vwrbsbvd vurdbi cczccglk xoywixutj hkutg.","status":"draft","author":"name","display_time":"1977-01-10 01:00:49","pageviews":1273},{"id":"630000200512105783","title":"Pyop ixibqgj lgfcbjpfm ylpvvcrose irvqbip mhuotmy eknmcbhk ibltjufx rhssi slhwfcrm lwdwwwcqy xjdjs.","status":"deleted","author":"name","display_time":"1989-02-26 01:59:11","pageviews":2214},{"id":"620000197610272458","title":"Mnmubrtvj pdvqh lcqikr lcfmuosutx hfjsutmk zfuoffwvu qhxbhc tkv tlemg wvuybhm vfqkpltq.","status":"published","author":"name","display_time":"1994-02-27 14:06:29","pageviews":1490}]
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.listLoading = false
    // this.fetchData()
  },
  methods: {
    // fetchData() {
    //   this.listLoading = true
    //   getList(this.listQuery).then(response => {
    //     this.list = response.data.items
    //     console.log(JSON.stringify(this.list),"this.list")
    //     this.listLoading = false
    //   })
    // }
  }
}
</script>
