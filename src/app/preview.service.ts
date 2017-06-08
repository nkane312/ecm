import { Injectable } from '@angular/core';
import { Appeal } from './models/appeal';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class PreviewService {
  public appeal: BehaviorSubject<Appeal> = new BehaviorSubject(new Appeal());
  public findTemplate(id:string){
    let opts;
    this.templates.map(function(t){
      if (t.id === id){
        opts = t.options;
      }
    });
    return opts;
  }
  public readonly templates: Array<Template> = [
    {
      id:'standardAppeal',
      name: 'Standard',
      country: 'United States',
      options: {
        body: [
          {
            title: 'Headline',
            tooltip: 'Paste in the headline here.',
            config: {
              height:80, 
              disableNativeSpellChecker:false, 
              //removePlugins:'stylescombo',
              removeButtons:'About,Indent,Outdent,Cut,Copy,Paste,Undo,Redo,Anchor,Strike,Subscript,Superscript',
              enterMode: 2
            }
          },
          {
            title: 'Sub Headline (Optional)',
            tooltip: 'Paste in the sub headline here.',
            config: {
              height:80, 
              disableNativeSpellChecker:false, 
              //removePlugins:'stylescombo',
              removeButtons:'About,Indent,Outdent,Cut,Copy,Paste,Undo,Redo,Anchor,Strike,Subscript,Superscript',
              enterMode: 2
            }
          },
          {
            title: 'Body',
            tooltip: 'Paste in the body copy here. <br><br>Only include the copy below the salutation and above the signature. <br><br>Double-click on the existing links to add the donation form URL.<br><br>Use this code to use a firstname, ministry partner can be changed as needed:<br><strong>[[S1:first_name:Ministry partner]]</strong>',
            config: {
              disableNativeSpellChecker:false,
              on: {
                instanceReady: function(){
                  if (this._.data === ''){
                    var tpl = new window['CKEDITOR']['template']('<p style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: #505050; text-align:left; line-height:21px; margin-bottom: 1em; font-weight:normal;"></p>');
                    this.setData(tpl.output());
                  }
                }
              }
            },
          },
          {
            title: 'PS',
            tooltip: 'Paste in the PS copy here. <br><br>Include the letters \'PS\'.',
            config: {height:80, disableNativeSpellChecker:false}
          },
          {
            title: 'Promo Headline',
            tooltip: 'Paste in the promotional headline here.',
            config: {
              height:80, 
              disableNativeSpellChecker:false, 
              //removePlugins:'stylescombo',
              removeButtons:'About,Indent,Outdent,Cut,Copy,Paste,Undo,Redo,Anchor,Strike,Subscript,Superscript',
              enterMode: 2
            }
          },
          {
            title: 'Promo Body',
            tooltip: 'Paste in the promotional body copy here. <br><br>Only include the copy below the salutation and above the signature. <br><br>Double-click on the existing links to add the donation form URL.<br><br>Use this code to use a firstname, ministry partner can be changed as needed:<br><strong>[[S1:first_name:Ministry partner]]</strong>',
            config: {
              disableNativeSpellChecker:false,
              on: {
                instanceReady: function(){
                  if (this._.data === ''){
                    var tpl = new window['CKEDITOR']['template']('<p style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: #505050; text-align:left; line-height:21px; margin-bottom: 1em; font-weight:normal;"></p>');
                    this.setData(tpl.output());
                  }
                }
              }
            },
          },
          {
            title: 'Custom Signature',
            tooltip: 'Put a custom signature here. Leave blank for the standard signature.',
            config: {height:80, disableNativeSpellChecker:false}
          }
        ],
        image: [
          {
            title: 'Main image',
            tooltip: 'Paste in the full image address from the Image Library in the Image URL. <br><br>Then add the Merlin or Brightcove ID for the image or video. <br><br>In Image source code add \'PH1\' for an image or \'VID1\' for a video. <br><br>In image UTM code add \'photo-link-1\' for an image or \'video-link-1\' for a video.'
          },
          {
            title: 'Promo image',
            tooltip: 'Paste in the full image address from the Image Library in the Image URL. <br><br>Then add the Merlin or Brightcove ID for the image or video. <br><br>In Image source code add \'PH2\' for an image or \'VID2\' for a video. <br><br>In image UTM code add \'photo-link-2\' for an image or \'video-link-2\' for a video.'
          }
        ]
      }
    },
    {
      id:'storeEmail',
      name: 'Store Email',
      country: 'United States',
      options: {
        body: [
          {
            title: 'Headline',
            tooltip: 'Paste in the headline here.',
            config: {
              height:80, 
              disableNativeSpellChecker:false, 
              //removePlugins:'stylescombo',
              removeButtons:'About,Indent,Outdent,Cut,Copy,Paste,Undo,Redo,Anchor,Strike,Subscript,Superscript',
              enterMode: 2
            }
          },
          {
            title: 'Body',
            tooltip: 'Paste in the body copy here. <br><br>Only include the copy below the salutation and above the signature. <br><br>Double-click on the existing links to add the donation form URL.<br><br>Use this code to use a firstname, ministry partner can be changed as needed:<br><strong>[[S1:first_name:Ministry partner]]</strong>',
            config: {
              disableNativeSpellChecker:false,
              on: {
                instanceReady: function(){
                  if (this._.data === ''){
                    var tpl = new window['CKEDITOR']['template']('<p style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: #505050; text-align:left; line-height:21px; margin-bottom: 1em; font-weight:normal;"></p>');
                    this.setData(tpl.output());
                  }
                }
              }
            }
          },
          {
            title: 'Custom Signature',
            tooltip: 'Put a custom signature here. Leave blank for the standard signature.',
            config: {height:80, disableNativeSpellChecker:false}
          },
          {
            title: 'PS',
            tooltip: 'Paste in the PS copy here. <br><br>Include the letters \'PS\'.',
            config: {height:80, disableNativeSpellChecker:false}
          }
        ],
        image: [
          {
            title: 'Main image',
            tooltip: 'Paste in the full image address from the Image Library in the Image URL. <br><br>Then add the Merlin or Brightcove ID for the image or video. <br><br>In Image source code add \'PH1\' for an image or \'VID1\' for a video. <br><br>In image UTM code add \'photo-link-1\' for an image or \'video-link-1\' for a video.'
          },
        ]
      }
    },
    {
      id:'fastAppeal',
      name: 'US I58 Fast',
      country: 'United States',
      options: {
        body: [
          {
            title: 'Headline',
            tooltip: 'Paste in the headline here.',
            config: {
              height:80, 
              disableNativeSpellChecker:false, 
              //removePlugins:'stylescombo',
              removeButtons:'About,Indent,Outdent,Cut,Copy,Paste,Undo,Redo,Anchor,Strike,Subscript,Superscript',
              enterMode: 2
            }
          },
          {
            title: 'Body',
            tooltip: 'Paste in the body copy here. <br><br>Only include the copy below the salutation and above the signature. <br><br>Double-click on the existing links to add the donation form URL.<br><br>Use this code to use a firstname, ministry partner can be changed as needed:<br><strong>[[S1:first_name:Ministry partner]]</strong>',
            config: {
              disableNativeSpellChecker:false,
              on: {
                instanceReady: function(){
                  if (this._.data === ''){
                    var tpl = new window['CKEDITOR']['template']('<p style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: #505050; text-align:left; line-height:21px; margin-bottom: 1em; font-weight:normal;"></p>');
                    this.setData(tpl.output());
                  }
                }
              }
            }
          },
          {
            title: 'Custom Signature',
            tooltip: 'Put a custom signature here. Leave blank for the standard signature.',
            config: {height:80, disableNativeSpellChecker:false}
          },
          {
            title: 'PS',
            tooltip: 'Paste in the PS copy here. <br><br>Include the letters \'PS\'.',
            config: {height:80, disableNativeSpellChecker:false}
          }
        ],
        image: [
          {
            title: 'Main image',
            tooltip: 'Paste in the full image address from the Image Library in the Image URL. <br><br>Then add the Merlin or Brightcove ID for the image or video. <br><br>In Image source code add \'PH1\' for an image or \'VID1\' for a video. <br><br>In image UTM code add \'photo-link-1\' for an image or \'video-link-1\' for a video.'
          }
        ]
      }
    },
    {
      id:'hhdAppeal',
      name: 'US High Holy Days',
      country: 'United States',
      options: {
        body: [
          {
            title: 'headline',
            tooltip: 'Paste in the headline here.',
            config: {
              height:80, 
              disableNativeSpellChecker:false, 
              //removePlugins:'stylescombo',
              removeButtons:'About,Indent,Outdent,Cut,Copy,Paste,Undo,Redo,Anchor,Strike,Subscript,Superscript',
              enterMode: 2
            }
          },
          {
            title: 'Body',
            tooltip: 'Paste in the body copy here. <br><br>Only include the copy below the salutation and above the signature. <br><br>Double-click on the existing links to add the donation form URL.<br><br>Use this code to use a firstname, ministry partner can be changed as needed:<br><strong>[[S1:first_name:Ministry partner]]</strong>',
            config: {
              disableNativeSpellChecker:false,
              on: {
                instanceReady: function(){
                  if (this._.data === ''){
                    var tpl = new window['CKEDITOR']['template']('<p style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: #505050; text-align:left; line-height:21px; margin-bottom: 1em; font-weight:normal;"></p>');
                    this.setData(tpl.output());
                  }
                }
              }
            }
          },
          {
            title: 'Custom Signature',
            tooltip: 'Put a custom signature here. Leave blank for the standard signature.',
            config: {height:80, disableNativeSpellChecker:false}
          },
          {
            title: 'PS',
            tooltip: 'Paste in the PS copy here. <br><br>Include the letters \'PS\'.',
            config: {height:80, disableNativeSpellChecker:false}
          }
        ],
        image: [
          {
            title: 'Main image',
            tooltip: 'Paste in the full image address from the Image Library in the Image URL. <br><br>Then add the Merlin or Brightcove ID for the image or video. <br><br>In Image source code add \'PH1\' for an image or \'VID1\' for a video. <br><br>In image UTM code add \'photo-link-1\' for an image or \'video-link-1\' for a video.'
          }
        ]
      }
    },
    {
      id:'hhdLargeAppeal',
      name: 'US High Holy Days - Large Image',
      country: 'United States',
      options: {
        body: [
          {
            title: 'Headline',
            tooltip: 'Paste in the headline here.',
            config: {
              height:80, 
              disableNativeSpellChecker:false, 
              //removePlugins:'stylescombo',
              removeButtons:'About,Indent,Outdent,Cut,Copy,Paste,Undo,Redo,Anchor,Strike,Subscript,Superscript',
              enterMode: 2
            }
          },
          {
            title: 'Body',
            tooltip: 'Paste in the body copy here. <br><br>Only include the copy below the salutation and above the signature. <br><br>Double-click on the existing links to add the donation form URL.<br><br>Use this code to use a firstname, ministry partner can be changed as needed:<br><strong>[[S1:first_name:Ministry partner]]</strong>',
            config: {
              disableNativeSpellChecker:false,
              on: {
                instanceReady: function(){
                  if (this._.data === ''){
                    var tpl = new window['CKEDITOR']['template']('<p style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: #505050; text-align:left; line-height:21px; margin-bottom: 1em; font-weight:normal;"></p>');
                    this.setData(tpl.output());
                  }
                }
              }
            },

          },
          {
            title: 'Custom Signature',
            tooltip: 'Put a custom signature here. Leave blank for the standard signature.',
            config: {height:80, disableNativeSpellChecker:false}
          },
          {
            title: 'PS',
            tooltip: 'Paste in the PS copy here. <br><br>Include the letters \'PS\'.',
            config: {height:80, disableNativeSpellChecker:false}
          }
        ],
        image: [
          {
            title: 'Main image',
            tooltip: 'Paste in the full image address from the Image Library in the Image URL. <br><br>Then add the Merlin or Brightcove ID for the image or video. <br><br>In Image source code add \'PH1\' for an image or \'VID1\' for a video. <br><br>In image UTM code add \'photo-link-1\' for an image or \'video-link-1\' for a video.'
          }
        ]
      }
    },
    {
      id:'passoverLargeAppeal',
      name: 'US Passover - Large Image',
      country: 'United States',
      options: {
        body: [
          {
            title: 'Headline',
            tooltip: 'Paste in the headline here.',
            config: {
              height:80, 
              disableNativeSpellChecker:false, 
              //removePlugins:'stylescombo',
              removeButtons:'About,Indent,Outdent,Cut,Copy,Paste,Undo,Redo,Anchor,Strike,Subscript,Superscript',
              enterMode: 2
            }
          },
          {
            title: 'Sub Headline (Optional)',
            tooltip: 'Paste in the sub headline here.',
            config: {
              height:80, 
              disableNativeSpellChecker:false, 
              //removePlugins:'stylescombo',
              removeButtons:'About,Indent,Outdent,Cut,Copy,Paste,Undo,Redo,Anchor,Strike,Subscript,Superscript',
              enterMode: 2
            }
          },
          {
            title: 'Body',
            tooltip: 'Paste in the body copy here. <br><br>Only include the copy below the salutation and above the signature. <br><br>Double-click on the existing links to add the donation form URL.<br><br>Use this code to use a firstname, ministry partner can be changed as needed:<br><strong>[[S1:first_name:Ministry partner]]</strong>',
            config: {
              disableNativeSpellChecker:false,
              on: {
                instanceReady: function(){
                  if (this._.data === ''){
                    var tpl = new window['CKEDITOR']['template']('<p style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: #505050; text-align:left; line-height:21px; margin-bottom: 1em; font-weight:normal;"></p>');
                    this.setData(tpl.output());
                  }
                }
              }
            },
          },
          {
            title: 'PS',
            tooltip: 'Paste in the PS copy here. <br><br>Include the letters \'PS\'.',
            config: {height:80, disableNativeSpellChecker:false}
          },
          {
            title: 'Promo Headline',
            tooltip: 'Paste in the promotional headline here.',
            config: {
              height:80, 
              disableNativeSpellChecker:false, 
              //removePlugins:'stylescombo',
              removeButtons:'About,Indent,Outdent,Cut,Copy,Paste,Undo,Redo,Anchor,Strike,Subscript,Superscript',
              enterMode: 2
            }
          },
          {
            title: 'Promo Body',
            tooltip: 'Paste in the promotional body copy here. <br><br>Only include the copy below the salutation and above the signature. <br><br>Double-click on the existing links to add the donation form URL.<br><br>Use this code to use a firstname, ministry partner can be changed as needed:<br><strong>[[S1:first_name:Ministry partner]]</strong>',
            config: {
              disableNativeSpellChecker:false,
              on: {
                instanceReady: function(){
                  if (this._.data === ''){
                    var tpl = new window['CKEDITOR']['template']('<p style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: #505050; text-align:left; line-height:21px; margin-bottom: 1em; font-weight:normal;"></p>');
                    this.setData(tpl.output());
                  }
                }
              }
            },
          },
          {
            title: 'Custom Signature',
            tooltip: 'Put a custom signature here. Leave blank for the standard signature.',
            config: {height:80, disableNativeSpellChecker:false}
          }
        ],
        image: [
          {
            title: 'Main image',
            tooltip: 'Paste in the full image address from the Image Library in the Image URL. <br><br>Then add the Merlin or Brightcove ID for the image or video. <br><br>In Image source code add \'PH1\' for an image or \'VID1\' for a video. <br><br>In image UTM code add \'photo-link-1\' for an image or \'video-link-1\' for a video.'
          },
          {
            title: 'Promo image',
            tooltip: 'Paste in the full image address from the Image Library in the Image URL. <br><br>Then add the Merlin or Brightcove ID for the image or video. <br><br>In Image source code add \'PH2\' for an image or \'VID2\' for a video. <br><br>In image UTM code add \'photo-link-2\' for an image or \'video-link-2\' for a video.'
          }
        ]
      }
    },
    {
      id:'emergencyResponseAppeal',
      name: 'Emergency Response',
      country: 'United States',
      options: {
        body: [
          {
            title: 'Headline',
            tooltip: 'Paste in the headline here.',
            config: {
              height:80, 
              disableNativeSpellChecker:false, 
              //removePlugins:'stylescombo',
              removeButtons:'About,Indent,Outdent,Cut,Copy,Paste,Undo,Redo,Anchor,Strike,Subscript,Superscript',
              enterMode: 2
            }
          },
          {
            title: 'Sub Headline (Optional)',
            tooltip: 'Paste in the sub headline here.',
            config: {
              height:80, 
              disableNativeSpellChecker:false, 
              //removePlugins:'stylescombo',
              removeButtons:'About,Indent,Outdent,Cut,Copy,Paste,Undo,Redo,Anchor,Strike,Subscript,Superscript',
              enterMode: 2
            }
          },
          {
            title: 'Body',
            tooltip: 'Paste in the body copy here. <br><br>Only include the copy below the salutation and above the signature. <br><br>Double-click on the existing links to add the donation form URL.<br><br>Use this code to use a firstname, ministry partner can be changed as needed:<br><strong>[[S1:first_name:Ministry partner]]</strong>',
            config: {
              disableNativeSpellChecker:false,
              on: {
                instanceReady: function(){
                  if (this._.data === ''){
                    var tpl = new window['CKEDITOR']['template']('<p style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: #505050; text-align:left; line-height:21px; margin-bottom: 1em; font-weight:normal;"></p>');
                    this.setData(tpl.output());
                  }
                }
              }
            },
          },
          {
            title: 'PS',
            tooltip: 'Paste in the PS copy here. <br><br>Include the letters \'PS\'.',
            config: {height:80, disableNativeSpellChecker:false}
          },
          {
            title: 'Promo Headline',
            tooltip: 'Paste in the promotional headline here.',
            config: {
              height:80, 
              disableNativeSpellChecker:false, 
              //removePlugins:'stylescombo',
              removeButtons:'About,Indent,Outdent,Cut,Copy,Paste,Undo,Redo,Anchor,Strike,Subscript,Superscript',
              enterMode: 2
            }
          },
          {
            title: 'Promo Body',
            tooltip: 'Paste in the promotional body copy here. <br><br>Only include the copy below the salutation and above the signature. <br><br>Double-click on the existing links to add the donation form URL.<br><br>Use this code to use a firstname, ministry partner can be changed as needed:<br><strong>[[S1:first_name:Ministry partner]]</strong>',
            config: {
              disableNativeSpellChecker:false,
              on: {
                instanceReady: function(){
                  if (this._.data === ''){
                    var tpl = new window['CKEDITOR']['template']('<p style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: #505050; text-align:left; line-height:21px; margin-bottom: 1em; font-weight:normal;"></p>');
                    this.setData(tpl.output());
                  }
                }
              }
            },
          },
          {
            title: 'Custom Signature',
            tooltip: 'Put a custom signature here. Leave blank for the standard signature.',
            config: {height:80, disableNativeSpellChecker:false}
          }
        ],
        image: [
          {
            title: 'Main image',
            tooltip: 'Paste in the full image address from the Image Library in the Image URL. <br><br>Then add the Merlin or Brightcove ID for the image or video. <br><br>In Image source code add \'PH1\' for an image or \'VID1\' for a video. <br><br>In image UTM code add \'photo-link-1\' for an image or \'video-link-1\' for a video.'
          },
          {
            title: 'Promo image',
            tooltip: 'Paste in the full image address from the Image Library in the Image URL. <br><br>Then add the Merlin or Brightcove ID for the image or video. <br><br>In Image source code add \'PH2\' for an image or \'VID2\' for a video. <br><br>In image UTM code add \'photo-link-2\' for an image or \'video-link-2\' for a video.'
          }
        ]
      }
    },
    {
      id:'prayerAlertAppeal',
      name: 'Prayer Alert',
      country: 'United States',
      options: {
        body: [
          {
            title: 'Headline',
            tooltip: 'Paste in the headline here.',
            config: {
              height:80, 
              disableNativeSpellChecker:false, 
              //removePlugins:'stylescombo',
              removeButtons:'About,Indent,Outdent,Cut,Copy,Paste,Undo,Redo,Anchor,Strike,Subscript,Superscript',
              enterMode: 2
            }
          },
          {
            title: 'Body',
            tooltip: 'Paste in the body copy here. <br><br>Only include the copy below the salutation and above the signature. <br><br>Double-click on the existing links to add the donation form URL.<br><br>Use this code to use a firstname, ministry partner can be changed as needed:<br><strong>[[S1:first_name:Ministry partner]]</strong>',
            config: {
              disableNativeSpellChecker:false,
              on: {
                instanceReady: function(){
                  if (this._.data === ''){
                    var tpl = new window['CKEDITOR']['template']('<p style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: #505050; text-align:left; line-height:21px; margin-bottom: 1em; font-weight:normal;"></p>');
                    this.setData(tpl.output());
                  }
                }
              }
            },
          },
          {
            title: 'PS',
            tooltip: 'Paste in the PS copy here. <br><br>Include the letters \'PS\'.',
            config: {height:80, disableNativeSpellChecker:false}
          },
          {
            title: 'Custom Signature',
            tooltip: 'Put a custom signature here. Leave blank for the standard signature.',
            config: {height:80, disableNativeSpellChecker:false}
          }
        ],
        image: [
          {
            title: 'Main image',
            tooltip: 'Paste in the full image address from the Image Library in the Image URL. <br><br>Then add the Merlin or Brightcove ID for the image or video. <br><br>In Image source code add \'PH1\' for an image or \'VID1\' for a video. <br><br>In image UTM code add \'photo-link-1\' for an image or \'video-link-1\' for a video.'
          }
        ]
      }
    },
    {
      id:'standardLargeAppeal',
      name: 'US Standard - Large Image',
      country: 'United States',
      options: {
        body: [
          {
            title: 'Headline',
            tooltip: 'Paste in the headline here.',
            config: {
              height:80, 
              disableNativeSpellChecker:false, 
              //removePlugins:'stylescombo',
              removeButtons:'About,Indent,Outdent,Cut,Copy,Paste,Undo,Redo,Anchor,Strike,Subscript,Superscript',
              enterMode: 2
            }
          },
          {
            title: 'Body',
            tooltip: 'Paste in the body copy here. <br><br>Only include the copy below the salutation and above the signature. <br><br>Double-click on the existing links to add the donation form URL.<br><br>Use this code to use a firstname, ministry partner can be changed as needed:<br><strong>[[S1:first_name:Ministry partner]]</strong>',
            config: {
              disableNativeSpellChecker:false,
              on: {
                instanceReady: function(){
                  if (this._.data === ''){
                    var tpl = new window['CKEDITOR']['template']('<p style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: #505050; text-align:left; line-height:21px; margin-bottom: 1em; font-weight:normal;"></p>');
                    this.setData(tpl.output());
                  }
                }
              }
            }
          },
          {
            title: 'Custom Signature',
            tooltip: 'Put a custom signature here. Leave blank for the standard signature.',
            config: {height:80, disableNativeSpellChecker:false}
          },
          {
            title: 'PS',
            tooltip: 'Paste in the PS copy here. <br><br>Include the letters \'PS\'.',
            config: {height:80, disableNativeSpellChecker:false}
          }
        ],
        image: [
          {
            title: 'Main image',
            tooltip: 'Paste in the full image address from the Image Library in the Image URL. <br><br>Then add the Merlin or Brightcove ID for the image or video. <br><br>In Image source code add \'PH1\' for an image or \'VID1\' for a video. <br><br>In image UTM code add \'photo-link-1\' for an image or \'video-link-1\' for a video.'
          }
        ]
      }
    },
    {
      id:'mobileFriendlyAppeal',
      name: 'Mobile Friendly',
      country: 'United States',
      options: {
        body: [
          {
            title: 'Headline',
            tooltip: 'Paste in the headline here.',
            config: {
              height:80, 
              disableNativeSpellChecker:false, 
              //removePlugins:'stylescombo',
              removeButtons:'About,Indent,Outdent,Cut,Copy,Paste,Undo,Redo,Anchor,Strike,Subscript,Superscript',
              enterMode: 2
            }
          },
          {
            title: 'Body',
            tooltip: 'Paste in the body copy here. <br><br>Only include the copy below the salutation and above the signature. <br><br>Double-click on the existing links to add the donation form URL.<br><br>Use this code to use a firstname, ministry partner can be changed as needed:<br><strong>[[S1:first_name:Ministry partner]]</strong>',
            config: {
              disableNativeSpellChecker:false,
              on: {
                instanceReady: function(){
                  if (this._.data === ''){
                    var tpl = new window['CKEDITOR']['template']('<p style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: #505050; text-align:left; line-height:21px; margin-bottom: 1em; font-weight:normal;"></p>');
                    this.setData(tpl.output());
                  }
                }
              }
            }
          },
          {
            title: 'Custom Signature',
            tooltip: 'Put a custom signature here. Leave blank for the standard signature.',
            config: {height:80, disableNativeSpellChecker:false}
          },
          {
            title: 'PS',
            tooltip: 'Paste in the PS copy here. <br><br>Include the letters \'PS\'.',
            config: {height:80, disableNativeSpellChecker:false}
          }
        ],
        image: [
          {
            title: 'Main image',
            tooltip: 'Paste in the full image address from the Image Library in the Image URL. <br><br>Then add the Merlin or Brightcove ID for the image or video. <br><br>In Image source code add \'PH1\' for an image or \'VID1\' for a video. <br><br>In image UTM code add \'photo-link-1\' for an image or \'video-link-1\' for a video.'
          }
        ]
      }
    },
    {
      id:'canhhdAppeal',
      name: 'CAN High Holy Days',
      country: 'Canada',
      options:{
        body: [
          {
            title: 'Headline',
            tooltip: 'Paste in the headline here.',
            config: {
              height:80, 
              disableNativeSpellChecker:false, 
              //removePlugins:'stylescombo',
              removeButtons:'About,Indent,Outdent,Cut,Copy,Paste,Undo,Redo,Anchor,Strike,Subscript,Superscript',
              enterMode: 2
            }
          },
          {
            title: 'Body',
            tooltip: 'Paste in the body copy here. <br><br>Only include the copy below the salutation and above the signature. <br><br>Double-click on the existing links to add the donation form URL.<br><br>Use this code to use a firstname, ministry partner can be changed as needed:<br><strong>[[S1:first_name:Ministry partner]]</strong>',
            config: {
              disableNativeSpellChecker:false,
              on: {
                instanceReady: function(){
                  if (this._.data === ''){
                    var tpl = new window['CKEDITOR']['template']('<p style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: #505050; text-align:left; line-height:21px; margin-bottom: 1em; font-weight:normal;"></p>');
                    this.setData(tpl.output());
                  }
                }
              }
            }
          },
          {
            title: 'Custom Signature',
            tooltip: 'Put a custom signature here. Leave blank for the standard signature.',
            config: {height:80, disableNativeSpellChecker:false}
          },
          {
            title: 'PS',
            tooltip: 'Paste in the PS copy here. <br><br>Include the letters \'PS\'.',
            config: {height:80, disableNativeSpellChecker:false}
          }
        ],
        image: [
          {
            title: 'Main image',
            tooltip: 'Paste in the full image address from the Image Library in the Image URL. <br><br>Then add the Merlin or Brightcove ID for the image or video. <br><br>In Image source code add \'PH1\' for an image or \'VID1\' for a video. <br><br>In image UTM code add \'photo-link-1\' for an image or \'video-link-1\' for a video.'
          }
        ]
      }
    },
    {
      id:'canhhdLargeAppeal',
      name: 'CAN High Holy Days - Large Image',
      country: 'Canada',
      options: {
        body: [
          {
            title: 'Headline',
            tooltip: 'Paste in the headline here.',
            config: {
              height:80, 
              disableNativeSpellChecker:false, 
              //removePlugins:'stylescombo',
              removeButtons:'About,Indent,Outdent,Cut,Copy,Paste,Undo,Redo,Anchor,Strike,Subscript,Superscript',
              enterMode: 2
            }
          },
          {
            title: 'Body',
            tooltip: 'Paste in the body copy here. <br><br>Only include the copy below the salutation and above the signature. <br><br>Double-click on the existing links to add the donation form URL.<br><br>Use this code to use a firstname, ministry partner can be changed as needed:<br><strong>[[S1:first_name:Ministry partner]]</strong>',
            config: {
              disableNativeSpellChecker:false,
              on: {
                instanceReady: function(){
                  if (this._.data === ''){
                    var tpl = new window['CKEDITOR']['template']('<p style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: #505050; text-align:left; line-height:21px; margin-bottom: 1em; font-weight:normal;"></p>');
                    this.setData(tpl.output());
                  }
                }
              }
            }
          },
          {
            title: 'Custom Signature',
            tooltip: 'Put a custom signature here. Leave blank for the standard signature.',
            config: {height:80, disableNativeSpellChecker:false}
          },
          {
            title: 'PS',
            tooltip: 'Paste in the PS copy here. <br><br>Include the letters \'PS\'.',
            config: {height:80, disableNativeSpellChecker:false}
          }
        ],
        image: [
          {
            title: 'Main image',
            tooltip: 'Paste in the full image address from the Image Library in the Image URL. <br><br>Then add the Merlin or Brightcove ID for the image or video. <br><br>In Image source code add \'PH1\' for an image or \'VID1\' for a video. <br><br>In image UTM code add \'photo-link-1\' for an image or \'video-link-1\' for a video.'
          }
        ]
      }
    },
    {
      id:'canPassoverLargeAppeal',
      name: 'CAN Passover - Large Image',
      country: 'Canada',
      options: {
        body: [
          {
            title: 'Headline',
            tooltip: 'Paste in the headline here.',
            config: {
              height:80, 
              disableNativeSpellChecker:false, 
              //removePlugins:'stylescombo',
              removeButtons:'About,Indent,Outdent,Cut,Copy,Paste,Undo,Redo,Anchor,Strike,Subscript,Superscript',
              enterMode: 2
            }
          },
          {
            title: 'Sub Headline (Optional)',
            tooltip: 'Paste in the sub headline here.',
            config: {
              height:80, 
              disableNativeSpellChecker:false, 
              removePlugins:'stylescombo',
              removeButtons:'About,Indent,Outdent,Cut,Copy,Paste,Undo,Redo,Anchor,Strike,Subscript,Superscript',
              enterMode: 2
            }
          },
          {
            title: 'Body',
            tooltip: 'Paste in the body copy here. <br><br>Only include the copy below the salutation and above the signature. <br><br>Double-click on the existing links to add the donation form URL.<br><br>Use this code to use a firstname, ministry partner can be changed as needed:<br><strong>[[S1:first_name:Ministry partner]]</strong>',
            config: {
              disableNativeSpellChecker:false,
              on: {
                instanceReady: function(){
                  if (this._.data === ''){
                    var tpl = new window['CKEDITOR']['template']('<p style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: #505050; text-align:left; line-height:21px; margin-bottom: 1em; font-weight:normal;"></p>');
                    this.setData(tpl.output());
                  }
                }
              }
            },
          },
          {
            title: 'PS',
            tooltip: 'Paste in the PS copy here. <br><br>Include the letters \'PS\'.',
            config: {height:80, disableNativeSpellChecker:false}
          },
          {
            title: 'Promo Headline',
            tooltip: 'Paste in the promotional headline here.',
            config: {
              height:80, 
              disableNativeSpellChecker:false, 
              removePlugins:'stylescombo',
              removeButtons:'About,Indent,Outdent,Cut,Copy,Paste,Undo,Redo,Anchor,Strike,Subscript,Superscript',
              enterMode: 2
            }
          },
          {
            title: 'Promo Body',
            tooltip: 'Paste in the promotional body copy here. <br><br>Only include the copy below the salutation and above the signature. <br><br>Double-click on the existing links to add the donation form URL.<br><br>Use this code to use a firstname, ministry partner can be changed as needed:<br><strong>[[S1:first_name:Ministry partner]]</strong>',
            config: {
              disableNativeSpellChecker:false,
              on: {
                instanceReady: function(){
                  if (this._.data === ''){
                    var tpl = new window['CKEDITOR']['template']('<p style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: #505050; text-align:left; line-height:21px; margin-bottom: 1em; font-weight:normal;"></p>');
                    this.setData(tpl.output());
                  }
                }
              }
            },
          },
          {
            title: 'Custom Signature',
            tooltip: 'Put a custom signature here. Leave blank for the standard signature.',
            config: {height:80, disableNativeSpellChecker:false}
          }
        ],
        image: [
          {
            title: 'Main image',
            tooltip: 'Paste in the full image address from the Image Library in the Image URL. <br><br>Then add the Merlin or Brightcove ID for the image or video. <br><br>In Image source code add \'PH1\' for an image or \'VID1\' for a video. <br><br>In image UTM code add \'photo-link-1\' for an image or \'video-link-1\' for a video.'
          },
          {
            title: 'Promo image',
            tooltip: 'Paste in the full image address from the Image Library in the Image URL. <br><br>Then add the Merlin or Brightcove ID for the image or video. <br><br>In Image source code add \'PH2\' for an image or \'VID2\' for a video. <br><br>In image UTM code add \'photo-link-2\' for an image or \'video-link-2\' for a video.'
          }
        ]
      }
    },
    {
      id:'canStandardAppeal',
      name: 'CAN Standard',
      country: 'Canada',
      options: {
        body: [
          {
            title: 'Headline',
            tooltip: 'Paste in the headline here.',
            config: {
              height:80, 
              disableNativeSpellChecker:false, 
              //removePlugins:'stylescombo',
              removeButtons:'About,Indent,Outdent,Cut,Copy,Paste,Undo,Redo,Anchor,Strike,Subscript,Superscript',
              enterMode: 2
            }
          },
          {
            title: 'Body',
            tooltip: 'Paste in the body copy here. <br><br>Only include the copy below the salutation and above the signature. <br><br>Double-click on the existing links to add the donation form URL.<br><br>Use this code to use a firstname, ministry partner can be changed as needed:<br><strong>[[S1:first_name:Ministry partner]]</strong>',
            config: {
              disableNativeSpellChecker:false,
              on: {
                instanceReady: function(){
                  if (this._.data === ''){
                    var tpl = new window['CKEDITOR']['template']('<p style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: #505050; text-align:left; line-height:21px; margin-bottom: 1em; font-weight:normal;"></p>');
                    this.setData(tpl.output());
                  }
                }
              }
            }
          },
          {
            title: 'Custom Signature',
            tooltip: 'Put a custom signature here. Leave blank for the standard signature.',
            config: {height:80, disableNativeSpellChecker:false}
          },
          {
            title: 'PS',
            tooltip: 'Paste in the PS copy here. <br><br>Include the letters \'PS\'.',
            config: {height:80, disableNativeSpellChecker:false}
          }
        ],
        image: [
          {
            title: 'Main image',
            tooltip: 'Paste in the full image address from the Image Library in the Image URL. <br><br>Then add the Merlin or Brightcove ID for the image or video. <br><br>In Image source code add \'PH1\' for an image or \'VID1\' for a video. <br><br>In image UTM code add \'photo-link-1\' for an image or \'video-link-1\' for a video.'
          }
        ]
      }
    },
    {
      id:'canFastAppeal',
      name: 'CAN Fast',
      country: 'Canada',
      options: {
        body: [
          {
            title: 'Headline',
            tooltip: 'Paste in the headline here.',
            config: {
              height:80, 
              disableNativeSpellChecker:false, 
              //removePlugins:'stylescombo',
              removeButtons:'About,Indent,Outdent,Cut,Copy,Paste,Undo,Redo,Anchor,Strike,Subscript,Superscript',
              enterMode: 2
            }
          },
          {
            title: 'Body',
            tooltip: 'Paste in the body copy here. <br><br>Only include the copy below the salutation and above the signature. <br><br>Double-click on the existing links to add the donation form URL.<br><br>Use this code to use a firstname, ministry partner can be changed as needed:<br><strong>[[S1:first_name:Ministry partner]]</strong>',
            config: {
              disableNativeSpellChecker:false,
              on: {
                instanceReady: function(){
                  if (this._.data === ''){
                    var tpl = new window['CKEDITOR']['template']('<p style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: #505050; text-align:left; line-height:21px; margin-bottom: 1em; font-weight:normal;"></p>');
                    this.setData(tpl.output());
                  }
                }
              }
            }
          },
          {
            title: 'Custom Signature',
            tooltip: 'Put a custom signature here. Leave blank for the standard signature.',
            config: {height:80, disableNativeSpellChecker:false}
          },
          {
            title: 'PS',
            tooltip: 'Paste in the PS copy here. <br><br>Include the letters \'PS\'.',
            config: {height:80, disableNativeSpellChecker:false}
          }
        ],
        image: [
          {
            title: 'Main image',
            tooltip: 'Paste in the full image address from the Image Library in the Image URL. <br><br>Then add the Merlin or Brightcove ID for the image or video. <br><br>In Image source code add \'PH1\' for an image or \'VID1\' for a video. <br><br>In image UTM code add \'photo-link-1\' for an image or \'video-link-1\' for a video.'
          }
        ]
      }
    },
  ];
  constructor() { }
}
export interface Template {
  id: string;
  name: string;
  country: string;
  options: {
    body: [{
      title: string,
      tooltip: string,
      config?: any
    }];
    image: [
      {
        title: string,
        tooltip: string,
      }
    ]
  }
}